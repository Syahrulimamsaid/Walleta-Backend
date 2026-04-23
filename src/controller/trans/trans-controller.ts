import transService from "../../service/trans/trans-service";

const get = async (req: any, res: any, next: any) => {
  try {
    const result = await transService.get(req);
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};


export default {get}
