import { ReactNode, InputHTMLAttributes, HTMLAttributes} from "react";
import { ProductNameTypes } from "../types";
 
export interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface IModal {
  isOpen : boolean, 
  openModal?: () => void,
  closeModal: () => void,
  title? : string,
  children : ReactNode, 
}

export interface IFormInput {
  id: string;
  name: ProductNameTypes;
  label: string;
  type: string;
}

export interface IInputs extends InputHTMLAttributes<HTMLInputElement> {   
}

export interface IColor extends HTMLAttributes<HTMLSpanElement>{
  color: string,
}

export interface ICategory {
  id: string;
  name: string;
  imageURL: string;
}

export interface ISelect {
  selected: {name: string, imageURL: string};
  setSelected: (category: ICategory) => void;
}

export interface IError {
  msg : string;
}