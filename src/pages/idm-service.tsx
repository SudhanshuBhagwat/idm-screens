import { useRouter } from "next/router";
import { useEffect } from "react";

declare global {
    interface Window {
        IDmissionSDK: any;
    }
}

let hasIDMSdkLoaded = false;

const SERVICES = {
    IDSCAN: "renderIdValidation",
    VIDEOID: "renderVideoIdValidation"
}

export default function Page() {
    const router = useRouter();
    const sessionId = router.query.sessionId;
    const service = router.query.service as string;

    useEffect(() => {
        if (hasIDMSdkLoaded) return;
        hasIDMSdkLoaded = true;

        const frame = document.querySelector<HTMLIFrameElement>("#idm-sdk");
        const script = document.createElement("script");
        script.src = "https://websdk-cdn-dev.idmission.com/websdk/2.1.82/loader.js";
        script.type = "module";
        script.async = true;
        script.onload = () => {
            hasIDMSdkLoaded = false;
            const idmRoot = document.createElement('div');
            idmRoot.setAttribute("id", "idm-root");
            frame?.contentWindow?.document.body.appendChild(idmRoot);
            frame?.contentWindow?.document.addEventListener("idmission-web-sdk.ready", () => {
                if (frame.contentWindow?.IDmissionSDK) {
                    frame.contentWindow?.IDmissionSDK[SERVICES[service as keyof typeof SERVICES]]('#idm-root', {
                        sessionId,
                        authUrl: "https://portal-api-uat.idmission.com",
                        submissionUrl: `https://portal-api-uat.idmission.com/swagger`,
                        documentServiceUrl: `https://portal-api-uat.idmission.com/files/`,
                        geolocationEnabled: false,
                        silentFallback: true,
                        lang: "en-MX",
                        ...(service === "VIDEOID" && { skipIdCapture: true })
                    });
                }
            });
        }
        frame?.contentWindow?.document.head.appendChild(script);

    }, []);

    return (
        <div className="mx-auto">
            <iframe className='min-h-screen w-[40rem]' allow="camera *; microphone *;" sandbox={`allow-scripts allow-same-origin`} id='idm-sdk'></iframe>
        </div>
    );
}