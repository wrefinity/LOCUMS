export const findAll = async (obj) => {
  const args = await obj.find({ isDeleted: false });
  return args;
};
export const findId = async (obj, id) => {
  const arg = await obj.findById(id);
  return arg;
};
export const findOne = async (obj, getter) => {
  const arg = await obj.findOne(getter);
  return arg;
};

export const creator = async (obj, payload) => {
  const created = await obj.create(payload);
  return created;
};
export const deletor = async (obj, id) => {
  const deleted = await obj.findByIdAndDelete(id);
  return deleted;
};
export const updator = async (obj, id, payload) => {
  const updated = await obj.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
    }
  );
  return updated;
};
