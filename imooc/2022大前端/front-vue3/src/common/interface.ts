import { ComputedRef } from 'vue'
import { ObjectSchema } from 'yup'

export interface UserInfo {
  _id: string;
  username?: string;
  name?: string;
  location?: string;
  gender?: string;
  regmark?: string;
  pic?: string;
  isSign?: boolean;
  lastSign?: string;
  count?: number;
  favs?: number;
}

export interface LoginInfo {
  username: string;
  password: string;
  code: string;
  sid?: string;
}

export interface RegInfo extends LoginInfo {
  name: string;
  repassword?: string;
}

export interface ResetInfo {
  key: string;
  password: string;
  code: string;
  sid: string;
}

export interface ForgetInfo {
  username: string;
  code: string;
}

export interface HttpResponse {
  code: number;
  data?: any;
  msg?: string | Record<string, any>;
  total?: number;
  count?: number;
  favs?: number;
  lastSign?: string;
  isCollect?: boolean;
  token?: string;
  notify?: any;
  userInfo?: any;
}

export interface ValidationResult {
  errors: string[];
}

export declare type SubmitEvent = Event & {
  target: HTMLFormElement;
};

export declare type GenericValidateFunction = (value: any) => boolean | string | Promise<boolean | string>;
export interface FormContext<TValues extends Record<string, any> = Record<string, any>> {
  register(field: any): void;
  unregister(field: any): void;
  values: TValues;
  fields: ComputedRef<Record<keyof TValues, any>>;
  schema?: Record<keyof TValues, GenericValidateFunction | string | Record<string, any>> | ObjectSchema<TValues>;
  validateSchema?: (shouldMutate?: boolean) => Promise<Record<keyof TValues, ValidationResult>>;
  setFieldValue<T extends keyof TValues>(field: T, value: TValues[T]): void;
  setFieldError: (field: keyof TValues, message: string | undefined) => void;
  setErrors: (fields: Partial<Record<keyof TValues, string | undefined>>) => void;
  setValues<T extends keyof TValues>(fields: Partial<Record<T, TValues[T]>>): void;
  setFieldTouched: (field: keyof TValues, isTouched: boolean) => void;
  setTouched: (fields: Partial<Record<keyof TValues, boolean>>) => void;
  setFieldDirty: (field: keyof TValues, isDirty: boolean) => void;
  setDirty: (fields: Partial<Record<keyof TValues, boolean>>) => void;
  reset: () => void;
}

export declare type SubmissionContext<TValues extends Record<string, any> = Record<string, any>> = {
  evt: SubmitEvent;
  form: FormContext<TValues>;
}

export declare type SubmissionHandler<TValues extends Record<string, any> = Record<string, any>> = (values: TValues, ctx: SubmissionContext<TValues>) => any;

export interface PageCommon {
  page: number;
  limit: number;
  index?: number;
}

export interface PostPageCommon extends PageCommon{
  uid: string;
}

export interface SimpleUserInfo {
  isVip: string;
  name: string;
  pic: string;
  _id: string;
}

export interface SortOptions extends PageCommon{
  catalog?: string;
  isTop?: number;
  sort?: string;
  tag?: string;
  status?: string;
}

export interface PostInfo {
  title: string;
  catalog?: string;
  content: string;
  fav?: number;
  code?: string;
  sid?: string;
  isEnd?: string;
  isFav?: number;
  tags?: Array<string>;
  sort?: string;
  status?: string;
  uid?: SimpleUserInfo;
  updated?: string;
  created?: string;
}

export interface CommentsInfo {
  _id: string;
  content: string;
  code: string;
  sid: string;
}
