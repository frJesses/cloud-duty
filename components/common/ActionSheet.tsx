import { Actionsheet, useDisclose } from "native-base";
import { forwardRef, useImperativeHandle } from "react";
import type React from "react";

export type ActionSheetRef = {
  open: () => void;
  close: () => void;
};

export type Action<T = any> = {
  label: string;
  value: T;
};

export interface ActionSheetProps<T = any> {
  actionList: Action<T>[];
  actionCallbak: (item: Action) => void;
}

const CustomActionsheetImpl = (
  { actionList = [], actionCallbak }: ActionSheetProps<any>,
  ref: React.ForwardedRef<ActionSheetRef>
) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

  function handleActionClick(item: Action) {
    onClose();
    actionCallbak(item);
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
      <Actionsheet.Content>
        {actionList.map((item) => (
          <Actionsheet.Item
            key={item.value}
            _pressed={{
              background: "gray.200",
            }}
            onPress={() => handleActionClick(item)}
          >
            {item.label}
          </Actionsheet.Item>
        ))}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

type CustomActionsheetComponent = <T = unknown>(
  props: ActionSheetProps<T> & React.RefAttributes<ActionSheetRef>
) => JSX.Element;

const CustomActionsheet = forwardRef(
  CustomActionsheetImpl
) as CustomActionsheetComponent;

export default CustomActionsheet;
