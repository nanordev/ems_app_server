import mongoose from "mongoose";
const { SchemaTypes } = mongoose;

const departmentSchema = mongoose.Schema({
    name: String,
    status:  String,
    hod: String,
    members: {
        type: SchemaTypes.Array,
        ref: 'Employee'
    }
})

const Department = mongoose.model("Department", departmentSchema)

export default Department;