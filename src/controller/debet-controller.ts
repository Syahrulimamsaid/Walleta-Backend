import debetService from "../service/debet-service";

const get = async (req: any, res: any, next: any) => {
  try {
    const result = await debetService.get(req);
    return res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const create = async (req: any, res: any, next: any) => {
  try {
    const result = await debetService.create(req);
    return res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
};


export default {get, create}
