import crypto from 'crypto';
import { Router } from 'express';
import { PASSWORD_SALT } from '../constants';
import { generateAccessToken } from '../utils';

export const createSessionRoute = sequelize => {
  const router = Router();

  router.put('/refresh', (req, res, next) => {
    // poyo
  });

  router.post('/signin', (req, res, next) => {
    const SessionDB = sequelize.models.Session;
    const UserDB = sequelize.models.User;
    const hash = crypto.createHash('sha512');
    const email = req.body.email;
    const password = req.body.password;

    hash.update(`${password}${PASSWORD_SALT}`, 'utf8');
    const hashedPassword = hash.digest('hex');

    UserDB.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw new Error('USER_NOT_FOUND');
        }
        if (user.hashedPassword !== hashedPassword) {
          throw new Error('USER_PASSWORD_INCORRECT');
        }

        return SessionDB.destroy({ where: { userId: user.id } })
          .then(() => {
            const session = new Session({
              userId: user.id,
              accessToken: generateAccessToken(),
              expiredAt: moment().add(14, 'days').format(),
            });

            delete session.id;

            return SessionDB.create(session);
          });
      })
      .then(session => {
        res.results = {
          session,
        };

        next();
      })
      .catch(err => {
        next(err);
      });
  });

  router.delete('/signout', (req, res, next) => {
    // poyo
  });

  return router;
};
