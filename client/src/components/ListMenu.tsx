import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CreateList from "./CreateList";

export default function ListMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton as={Button}>Add to list</MenuButton>
                <MenuList>
                    <MenuItem icon={<AddIcon />} onClick={onOpen}>
                        Create new list
                    </MenuItem>
                    <MenuItem>Watch list</MenuItem>
                </MenuList>
            </Menu>
            <CreateList isOpen={isOpen} onClose={onClose} />
        </>
    );
}
