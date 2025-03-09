import { Datagrid, List, TextField, NumberField } from "react-admin";

export const CourseList = () => {
    return (
    <List>
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="title" />
            <TextField source="imageSrc" />
        </Datagrid>
    </List>
    )
};