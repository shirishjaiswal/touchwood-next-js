interface Base_FormDataTab {
  id: number;
  uniqueKey: string;
  label: string;
  description: string;
  link: string;
  position: number;
};

export type Client_FormDataTab_Write = Omit<Base_FormDataTab, 'uniqueKey' | 'id'>;

export type Server_FormDataTab_Write = Omit<Base_FormDataTab, 'id'> ;

export type FormDataTab_UpWrite = Omit<Base_FormDataTab, 'id'>;

export type FormDataTab_Read = Base_FormDataTab;