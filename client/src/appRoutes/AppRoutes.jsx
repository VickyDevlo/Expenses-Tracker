import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import DeleteExpenses from "../components/DeletedExpenses";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/deleted-expenses" element={<DeleteExpenses />} />
    </Routes>
  );
};
