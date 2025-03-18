import { EventInterface, EventInterfaceValue } from "./type";

export const getEventFormat = (
    value: EventInterfaceValue,
    validationMessage: string | undefined = undefined,
  ): EventInterface => {
    return {
      target: {
        value: value,
        validationMessage: validationMessage,
      },
    };
  };

export const getKey = (content : string = '', pre : string = '', post : string = '') : string => {
    return `key-${pre}-${content.toLowerCase().split(' ').join('-')}-${post}`;
}

export const getId = (content : string = '', pre: string = '', post : string = '') : string => {
    return `id-${pre}-${content.toLowerCase().split(' ').join('-')}-${post}`;
}