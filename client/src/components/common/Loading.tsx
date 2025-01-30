import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  content?: string;
  inverted?: boolean;
}
const Loading = ({ content = "Loading ...", inverted = true }: Props) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader>{content}</Loader>
    </Dimmer>
  );
};

export default Loading;
