import authService from "../service/auth-service";

const login = async (req: any, res: any, next: any) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const logout = async (req: any, res: any, next: any) => {
  try {
    const result = await authService.logout(
      req.headers.authorization?.split(" ")[1],
    );
    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const logked = async (req: any, res: any, next: any) => {
  try {
    const result = await authService.logked(
      req.headers.authorization?.split(" ")[1],
    );
    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default { login, logout, logked };
