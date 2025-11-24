import React from "react";
import PersonWorking from "./illustrations/PersonWorking";

const illustrations = {
  personWork: PersonWorking,
};

type IllustrationProps = {
  name: keyof typeof illustrations;
  className?: string;
};
const Illustration: React.FC<IllustrationProps> = ({ name, className }) => {
  const CurrentIllustration = illustrations[name];
  return <CurrentIllustration className={className} />;
};

export default Illustration;
