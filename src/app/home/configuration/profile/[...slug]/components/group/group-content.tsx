"use client";
import { Arrow } from "@/components/ui/icons";
import { useState } from "react";
import FieldContentRender from "@/app/admin/configuration/profile/[...slug]/components/field/field-content-render";
import { FormDataGroup_Read } from "@/lib/types/form-data/group";
import { motion } from "framer-motion";

type GroupContentProps = {
  groupContent: FormDataGroup_Read;
};

function GroupContent({ groupContent }: GroupContentProps) {
  const [isGroupOpen, setGroupOpen] = useState<boolean>(false);

  return (
    <div className="group-content-container flex flex-col justify-between gap-2 bg-neutral-100 rounded p-4 mb-4 shadow-lg">
      <div
        id="add-group"
        role="button"
        className="flex justify-between gap-1 pr-0 pl-0 w-full cursor-pointer focus:outline-none"
        onClick={() => setGroupOpen(!isGroupOpen)}
      >
        <h1 className="text-xl font-semibold text-primary-600">
          {groupContent.label}
        </h1>
        <Arrow
          color={"#e3e3e3"}
          className={`rotate-${isGroupOpen ? "270" : "90"} transform transition-all ease-in-out z-10`}
        />
      </div>

      {/* Group Content with Framer Motion */}
      <motion.div
        className="group-content flex flex-col gap-2"
        initial={{ opacity: 0, height: 0 }} 
        animate={{
          opacity: isGroupOpen ? 1 : 0, 
          height: isGroupOpen ? "auto" : 0, 
        }}
        transition={{ duration: 0.3 }}
      >
        {isGroupOpen && (
          <FieldContentRender parentListContent={groupContent.formDataField} />
        )}
      </motion.div>
    </div>
  );
}

export default GroupContent;