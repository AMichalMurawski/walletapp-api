const walletService = require('../services/walletService');
const JoiSchema = require('../schemas/walletSchema');

const create = async (req, res, next) => {
  try {
    const { _id } = await req.user;
    let { date, type, category, comment, sum } = await req.body;

    const isValid = JoiSchema.allRequired.validate({
      date,
      type,
      category,
      comment,
      sum,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const transaction = await walletService.addTransaction({
      date,
      type,
      category,
      comment,
      sum,
      owner: _id,
    });
    res.status(201).json({ transaction });
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

module.exports = { list, create };
