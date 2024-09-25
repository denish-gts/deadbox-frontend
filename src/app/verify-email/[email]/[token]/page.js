import React, { Suspense } from "react";
import VerifyEmailContent from "../../../../component/verifyEmail";

function SearchBarFallback() {
    return <>Loading</>
}
function VerifyEmail() {
    console.log('ddddddddddddddddddddddd');
    
    return (
        <Suspense fallback={<SearchBarFallback />}>
            <VerifyEmailContent />
        </Suspense>
    )

}

export default VerifyEmail;