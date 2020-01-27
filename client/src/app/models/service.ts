export class Service {
  public id;
  public number;
  public name;
  public category;
  public technicalPrice;
  public minPrice;
  public maxPrice;
  public lastModificationUser;

  constructor(service) {
    this.id = service._id;
    this.number = service.number;
    this.name = service.name;
    this.category = service.category;
    this.technicalPrice = service.technicalPrice;
    this.minPrice = service.minPrice;
    this.maxPrice = service.maxPrice;
    this.lastModificationUser = service.lastModificationUser;
  }
}
