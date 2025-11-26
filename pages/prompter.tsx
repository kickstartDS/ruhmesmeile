import { HeadlineLevelProvider } from "@/components/headline/HeadlineLevelContext";
import { PrompterComponent } from "@/components/prompter/PrompterComponent";
import { NextPage } from "next";

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return (
    <HeadlineLevelProvider>
      <PrompterComponent />
    </HeadlineLevelProvider>
  );
};

export default Page;
