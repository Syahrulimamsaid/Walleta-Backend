import accountService from "../service/account-service";

const get = async (req: any, res: any, next: any) => {
  try {
    const result = await accountService.get(req);
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};


export default {get}
