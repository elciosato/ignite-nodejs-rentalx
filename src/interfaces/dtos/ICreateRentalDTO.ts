export interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  start_date?: Date;
  total?: number;
}
