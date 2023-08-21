import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Button } from '../../atoms/button';
import { Fragment, ReactNode } from 'react';
import { DialogueClose, DialogueContent } from './styles';

type DialogProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonClassName?: string;
  children: ReactNode;
  variant: 'confirmation' | 'saveOrCancel';
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
};

export const Dialog = ({
  buttonLabel,
  buttonClassName,
  children,
  description,
  title,
  isOpen,
  setIsOpen,
  onCancel,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button className={buttonClassName}>{buttonLabel}</Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <DialogPrimitive.Content forceMount className={DialogueContent}>
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                {description}
              </DialogPrimitive.Description>
              {children}

              <DialogPrimitive.Close
                className={DialogueClose}
                onClick={onCancel}>
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
