"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const DialogTransitionContext = React.createContext<Transition | undefined>(
  undefined
);

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface MorphingDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  transition?: Transition;
}

const MorphingDialog: React.FC<MorphingDialogProps> = ({
  transition,
  ...props
}) => (
  <DialogTransitionContext.Provider value={transition}>
    <Dialog {...props} />
  </DialogTransitionContext.Provider>
);

const MorphingDialogTrigger = DialogTrigger;

const MorphingDialogContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <DialogPortal>
    <DialogOverlay />
    {children}
  </DialogPortal>
);

const MorphingDialogContent = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({ className, children, ...props }, ref) => {
  const transition = React.useContext(DialogTransitionContext);
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={transition || { duration: 0.2 }}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});
MorphingDialogContent.displayName = "MorphingDialogContent";

const MorphingDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
MorphingDialogTitle.displayName = DialogPrimitive.Title.displayName;

const MorphingDialogSubtitle = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MorphingDialogSubtitle.displayName = "MorphingDialogSubtitle";

const MorphingDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MorphingDialogDescription.displayName = DialogPrimitive.Description.displayName;

const MorphingDialogImage = React.forwardRef<
  React.ElementRef<typeof motion.img>,
  React.ComponentPropsWithoutRef<typeof motion.img>
>(({ className, ...props }, ref) => (
  <motion.img ref={ref} className={cn("w-full h-auto", className)} {...props} />
));
MorphingDialogImage.displayName = "MorphingDialogImage";

const MorphingDialogClose = React.forwardRef<
  React.ElementRef<typeof DialogClose>,
  React.ComponentPropsWithoutRef<typeof DialogClose>
>(({ className, ...props }, ref) => (
  <DialogClose
    ref={ref}
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogClose>
));
MorphingDialogClose.displayName = DialogClose.displayName;

export {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogImage,
  MorphingDialogDescription,
  MorphingDialogClose,
  MorphingDialogContainer,
};
