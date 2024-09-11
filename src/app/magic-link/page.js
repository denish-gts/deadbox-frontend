import React, { Suspense } from "react";
import MagicLinkContent from "../../component/magic-link";

function SearchBarFallback() {
    return <>Loading</>
}
function MagicLink() {
    return (
        <Suspense fallback={<SearchBarFallback />}>
            <MagicLinkContent />
        </Suspense>
    )

}

export default MagicLink;