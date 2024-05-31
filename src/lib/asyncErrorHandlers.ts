// export const asyncErrorHandlers = (fn) => {
//   return async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       if (error instanceof Error) {
//         return res.status(500).json({ message: error.message });
//       } else {
//         return res.status(500).json({ message: "An unknown error occurred" });
//       }
//     }
//   };
// };
