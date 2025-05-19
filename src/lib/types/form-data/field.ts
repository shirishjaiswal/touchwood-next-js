import { FormDataGroup_Read } from "@/lib/types/form-data/group"

interface Base_FormDataField {
  id: number
  uniqueKey: string
  inputType: string
  label: string
  description: string
  labelVisible: boolean
  multiple: boolean
  required: boolean
  value : string[]
  formDataGroup: FormDataGroup_Read
}

export interface FormDataField_Write_Client extends Omit<Base_FormDataField, 'value' | 'formDataGroup' | 'uniqueKey'> {
  formDataGroupId: number
}

export type FormDataField_Write_Server = Omit<Base_FormDataField, 'value' | 'formDataGroup'>

export type FormDataField_Read = Base_FormDataField