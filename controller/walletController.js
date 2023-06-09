// const mongoose = require('mongoose');

const walletService = require('../services/walletService');
const userService = require('../services/userService');
const walletUtils = require('../utils/walletUtils');
// const JoiSchema = require('../schemas/walletSchema');

require('dotenv').config();

const createWallet = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const user = await userService.getUserById({ _id: userId });
    if (!user) {
      return res.status(401).json({
        message: 'Not authorized',
      });
    }

    const wallet = await walletService.createWallet({
      balance: 0,
      transactions: [],
      categories: walletUtils.basicCategories(),
      owners: [{ id: user._id, name: user.firstName, role: 'main' }],
    });
    if (!wallet) {
      return res.status(409).json({
        message: 'Wallet not created, try again',
      });
    }

    await userService.updateUserWallets({
      _id: userId,
      wallet: { id: wallet._id, role: 'main' },
    });

    res.status(201).json({ walletId: wallet._id });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// ===> Schemat dodania (...props zamień na poszczególne dane) <===
// const create = async (req, res, next) => {
//   try {
//     const { ...props } = await req.body;

// // // walidacja propsów
//     const isValid = JoiSchema.allRequired.validate({
//       ...props
//     });
//     if (isValid.error) {
//       return res.status(400).json({
//         message: isValid.error.details[0].message,
//       });
//     }
// // // koniec walidacji

//     const payment = await walletService.addPayment({
//       ...props
//     });
//     res.status(201).json({ payment });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// // Walidacja dla dowolnego propsa (wymagany przynajmniej jeden)
//     const isValid = JoiSchema.atLeastOne.validate({
//       ...props
//     });
//     if (isValid.error) {
//       res.status(400).json({
//         message: isValid.error.details[0].message,
//       });
//       return;
//     }

module.exports = { createWallet };
