import React from "react"
import {ALERT_DURATION, SUCCESS_CODE} from "../../constants"
import { Alert, Snackbar } from "@mui/material"

const AlertMessage = ({code, message, setMessage, duration}) => {
    
    return (
        <div>      
            <Snackbar
                anchorOrigin={{ horizontal:"center", vertical:"top" }}
                open={!!message}
                autoHideDuration={duration || ALERT_DURATION}
                onClose={() => setMessage(null)}
            >
                <Alert
                    style={{margin: "auto"}}
                    variant="filled"
                    severity={code === SUCCESS_CODE ? "success" : "error"}
                >
                    <span>{message}</span>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertMessage