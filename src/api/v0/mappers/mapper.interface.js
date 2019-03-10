export default class MapperInterface {
  toModel() {
    throw new Error("must implement this method");
  }

  toDomain() {
    throw new Error("must implement this method");
  }
}
