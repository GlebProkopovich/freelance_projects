export interface IPosition {
  position: [number, number];
  locationOfTheRestaurant: string;
  adressOfTheRestaurant: string;
}

export interface IPostDish {
  id?: number;
  imgSrc: string;
  altImg: string;
  title: string;
  price: string;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IModalOpened {
  isOpened: boolean;
}

export interface IModal {
  modal: {
    isOpened: boolean;
  };
}
