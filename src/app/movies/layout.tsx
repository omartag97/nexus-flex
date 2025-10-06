import BaseLayout from "@/shared/layouts/BaseLayout";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <BaseLayout>{children}</BaseLayout>;
}
