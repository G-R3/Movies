import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ListModal from "./ListModal";

export default function ListMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton as={Button} marginTop="2">
                    Add to list
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<AddIcon />} onClick={onOpen}>
                        Create new list
                    </MenuItem>
                    <MenuItem>Watch list</MenuItem>
                </MenuList>
            </Menu>
            <ListModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
