import { HeadlineLevelProvider } from "@/components/headline/HeadlineLevelContext";
import { PrompterFrame } from "@/components/prompter/Prompter";
import { NextPage } from "next";

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return (
    <HeadlineLevelProvider>
      <PrompterFrame />
    </HeadlineLevelProvider>
  );
};

export default Page;
