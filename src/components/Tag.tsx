import { Tag, TagLabel } from "@chakra-ui/react";
import colorMap from "../utils/genreToColor";

type Props = {
    name: string;
};

const GenreTag = ({ name }: Props): JSX.Element => {
    const { background, color } = colorMap[name];
    return (
        <Tag
            size="sm"
            variant="subtle"
            backgroundColor={background}
            color={color}
        >
            <TagLabel>{name}</TagLabel>
        </Tag>
    );
};

export default GenreTag;
