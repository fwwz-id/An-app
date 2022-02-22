import { memo } from "react";

import Backdrop from "../atoms/Backdrop";

import { BiLoaderAlt } from "react-icons/bi";

function Preload({ isLoading }) {
    return isLoading ? (
        <Backdrop>
            <BiLoaderAlt className="text-sky-500 animate-spin text-5xl" />
        </Backdrop>
    ) : null;
}

export default memo(Preload);
