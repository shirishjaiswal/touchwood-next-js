import { FormDataTab_Read } from "@/lib/types/form-data/tab";

interface Base_FormDataGroup {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  labelVisible: boolean;
  multiple: boolean;
  required: boolean;
  formDataTab: FormDataTab_Read;
  formDataField: any[];
};

export interface Client_FormDataGroup_Write extends Omit<Base_FormDataGroup, 'uniqueKey' | 'id' | 'formDataTab' | 'formDataParent'> {
  formDataTabId: number;
};

export interface Server_FormDataGroup_Write extends Omit<Base_FormDataGroup, 'id' | 'formDataTab' | 'formDataParent'> {
  formDataTabId: number;
};

export interface FormDataGroup_UpWrite extends Omit<Base_FormDataGroup, 'id' | 'formDataTab' | 'formDataParent'> {
  formDataTabId: number;
};

export type FormDataGroup_Read = Base_FormDataGroup;