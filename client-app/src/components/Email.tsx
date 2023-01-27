import { JsxElement } from "typescript"
import React,{useState,useEffect,useRef, ChangeEvent} from 'react';
import { EmailClient,EmailAttachment, EmailAttachmentType, EmailMessage } from '@azure/communication-email';
import EmailTemplate from "./EmailTemplate";
import * as fs from 'fs';

const Email=():JSX.Element=>{
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState ('');
    const [name, setName] = useState ('');
    const [file, setFile] = useState<File>();
    const [comment,setComment] = useState('');
    const [template,setTemplate] = useState('');
    const connectionString = "endpoint=https://acs-app-validations.communication.azure.com/;accesskey=F7/3U887zz4Ur5CZwhQmGLml8y9uWVb6ir4kqI2K4FyGtShWFxdYBLBf4ZxtJ41P6C5KUC2sZpfayCOtl9DMbw==";
    const selectHandler=(templateValue: React.SetStateAction<string>)=>{
        setTemplate(templateValue)
    }
    const senderHandler=(event: { target: { value: React.SetStateAction<string>; }; })=>{
        setSender(event.target.value)
    }
    const recipientHandler=(event: { target: { value: React.SetStateAction<string>; }; })=>{
        setRecipient(event.target.value)
    }
    const nameHandler=(event:{ target: { value: React.SetStateAction<string>; }; })=>{
        setName(event.target.value)
    }
    const commentHandler=(event: { target: { value: React.SetStateAction<string>; }; })=>{
        setComment(event.target.value)
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        // Uploading the file using the fetch API to the server
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            // Set headers manually for single file upload
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`, // Headers need to be a string
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };
    const clickHandler = (event: React.MouseEvent<HTMLElement>):void => {
        console.log("senders email is " + sender);
        console.log("recipients email is " + recipient);
        console.log("recipient name is " + name);
        console.log("Template is"+template);
        console.log("File name is "+file?.name);
    }

    const submithandler = (event: { preventDefault: () => void; }): void => {
        event.preventDefault();
        if (!file) {
            return
        }
        else {
            const AttachmentPath = __dirname + "\\attachment."+file?.type;
            const AttachmentContent = fs.readFileSync(AttachmentPath).toString("base64");
            const fileType = file.type;
            console.log("fileType:" + fileType)
            const emailAttachments: EmailAttachment[] = [
               {
                   name: "attachment." + file?.type,
                   attachmentType: "pdf",
                   contentBytesBase64: AttachmentContent
               }
            ];

            try {
                var client = new EmailClient(connectionString);
                //send mail
                const emailMessage: EmailMessage = {
                    sender: sender.toString(),
                    content: {
                        subject: "Welcome to Azure Communication Service Email.",
                        plainText: comment.toString()+template
                    },
                    recipients: {
                        to: [
                            {
                                email: recipient.toString(),
                            },
                        ],
                    },
                    // attachments: emailAttachments
                };

                client.send(emailMessage);

            } catch (e) {
                console.log(e);
            }
        }

    }
    return(
        <div style={{width:'50%',height:'10%',marginTop:'15px'}}>
             <form className='row' style={{ margin: '25px 85px 25px 85px' }} onSubmit={submithandler}>
                <EmailTemplate onSelect={selectHandler}/>
                <div>
                <label>Sender's Email</label>
                <input type='email' name='SenderEmail' placeholder='<donotreply@xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.azurecomm.net>' className="form-control" style={{ margin: "1rem" }} onChange={senderHandler} />
                </div>
                <div>
                <label>Recipient's Email</label>
                <input type='email' name='RecipientEmail' placeholder='RecipientsEmail' className="form-control" style={{ margin: "1rem" }} onChange={recipientHandler}/>
                </div>
                <div>
                <label>Recipient's Name</label>
                <input  type='text' name='name' placeholder='RecipientsName' className="form-control" style={{ margin: "1rem" }} onChange={nameHandler}/>
                </div>
                <div>
                <label>Comment</label>
                <textarea placeholder='Comments' name='message' className="form-control" style={{ margin: "1rem" }} onChange={commentHandler}/>
                </div>
                <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUploadClick}>Upload</button>
                </div>
                <button type="submit" onClick={clickHandler} className="form-control btn btn-primary" style={{ margin: "1rem" }}>Send Mail</button>
            </form>
        </div>
    )
}
export default Email;