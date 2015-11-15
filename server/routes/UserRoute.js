import crypto from 'crypto';
import { Router } from 'express';
import { PASSWORD_SALT } from '../constants';
import { User } from '../../models';

export const createUserRoute = ({ sequelize, models }) => {
  const router = Router();

  router.post('/', (req, res, next) => {
    console.log('aru');

    const { User } = models;
    const UserDB = sequelize.models.User;
    const password = req.body.password;

    User.fromJSON(req.body.user)
      .then(user => {
        const hash = crypto.createHash('sha512');

        hash.update(`${password}${PASSWORD_SALT}`, 'utf8');
        const hashedPassword = hash.digest('hex');
        const row = Object.assign({}, user, {
          hashedPassword,
        });

        delete row.id;

        return UserDB.create(row);
      })
      .then(row => {
        console.error('yoi!');
        console.log(next);

        const user = row.dataValues;

        res.locals.result = { user };

        next();
      })
      .catch(err => {
        console.error('hoi!');

        next(err);
      });
  });
  //
  // router.put('/refresh', (req, res, next) => {
  //   // poyo
  // });
  //
  // router.post('/signin', (req, res, next) => {
  //   const SessionResource = sequelize.models.Session;
  //   const UserResource = sequelize.models.User;
  //   const hash = crypto.createHash('sha512');
  //   const email = req.body.email;
  //   const password = req.body.password;
  //
  //   hash.update(`${password}${PASSWORD_SALT}`, 'utf8');
  //   const hashedPassword = hash.digest('hex');
  //
  //   UserResource.findOne({ where: { email } })
  //     .then(user => {
  //       if (!user) {
  //         throw new Error('USER_NOT_FOUND');
  //       }
  //       if (user.hashedPassword !== hashedPassword) {
  //         throw new Error('USER_PASSWORD_INCORRECT');
  //       }
  //
  //       return SessionResource.destroy({ where: { userId: user.id } })
  //         .then(() => {
  //           const session = new Session({
  //             userId: user.id,
  //             accessToken: generateAccessToken(),
  //             expiredAt: moment().add(14, 'days').format(),
  //           });
  //
  //           delete session.id;
  //
  //           return SessionResource.create(session);
  //         });
  //     })
  //     .then(session => {
  //       res.results = {
  //         session,
  //       };
  //
  //       next();
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  // });
  //
  // router.delete('/signout', (req, res, next) => {
  //   // poyo
  // });

  return router;
};
