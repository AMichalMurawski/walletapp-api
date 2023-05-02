const nanoid = require('nanoid');
const walletService = require('../services/walletService');
const { walletSchema } = require('../schemas/walletSchema');

const createWallet = async (req, res, next) => {
  try {
    const userId = req.user && req.user._id;
    if (!userId) {
      throw new Error('User not found');
    }

    const { error } = walletSchema.validate({ _id: userId });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const wallet = await walletService.createWallet({
      walletId: nanoid.nanoid(10),
      balance: 0,
      transactions: [],
      owners: [userId],
    });
    if (!wallet) {
      throw new Error('Failed to create wallet');
    }

    res.status(201).json({ walletId: wallet.walletId });
  } catch (error) {
    console.error(error);
    next(error);
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
