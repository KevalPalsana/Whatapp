import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessages, getMessages, deletemessage, updateMessageSeen } from '../redux/action/Chat';
import { IoIosVideocam, IoIosSend } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdKeyboardVoice } from 'react-icons/md';
import { userAuth } from '../context/Authcontext';
import { useSocketContext } from '../context/SocketContext';
import { IoCheckmarkOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

const Chat = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const { messages } = useSelector((state) => state.chat);
  const { authuser } = userAuth();
  const {socket} = useSocketContext();

  const inputvalue = useRef();
  const ScrollRef = useRef();

  const [localMessages, setLocalMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentmsg,setCurrentmsg]= useState('');


  useEffect(() => {
    console.log('authuser', authuser)
    console.log('selectedUser', selectedUser)
    if (authuser && selectedUser) {
      dispatch(getMessages({ senderid: authuser._id, receiverid: selectedUser._id }));
    }
  }, [selectedUser]);


  useEffect(() => {
    if (selectedUser && messages?.length > 0) {
      setLocalMessages((prev) => {
        if (!prev.length || prev[0]?.receiverid !== messages[0]?.receiverid) {
          return messages;
        }
        return prev;
      });
    }
  }, [messages]);


  useEffect(() => {
    if (!socket) return;
if(socket){

    const handleReceive = (msg) => {
      console.log('msg', msg)
      const alreadyExists = localMessages.some((m) => m._id === msg._id);
      if (alreadyExists) return;

      if (
        (msg.senderid === selectedUser._id && msg.receiverid === authuser._id) ||
        (msg.receiverid === selectedUser._id && msg.senderid === authuser._id)
      ) {
        setLocalMessages((prev) => [...prev, msg]);
        showCustomAlert(typeof msg.message === "string" ? msg.message : JSON.stringify(msg.message));
        setCurrentmsg(msg);
      }
    };

    const handleMessageDeleted = (deletedMessageId) => {
      console.log('deletedMessageId', deletedMessageId)
      setLocalMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessageId)
      );
    };

    const handleMessageSeen = (seenMessageId) => {
      console.log('seenMessageId', seenMessageId)
      setLocalMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === seenMessageId ? { ...msg, status: 'seen' } : msg
        )
      );
    };

    socket.on('receiveMessage', handleReceive);
    socket.on('messageDeleted', handleMessageDeleted);
    socket.on('messageSeen', handleMessageSeen);

    return () => {
      socket.off('receiveMessage', handleReceive);
      socket.off('messageDeleted', handleMessageDeleted);
      socket.off('messageSeen', handleMessageSeen);
    };}
  }, [socket, selectedUser, authuser]);
  

  useEffect(() => {
    if (!socket) return;
  
    socket.on("messageStatusUpdate", ( {messageid, status}) => {
      dispatch(updateMessageSeen(messageid, status));
      setLocalMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === messageid ? { ...msg, status } : msg
        )
      );
    });
  
    return () => {
      socket.off("messageStatusUpdate");
    };
  }, [socket, dispatch]); 

  useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages]);

  const handleSendMessage = async () => {
    const messageText = inputvalue.current.value;
    if (!messageText) return;
    
    const response = await dispatch(sendMessages(authuser._id, selectedUser._id, messageText));
    console.log('response', response);
    
    if (socket) {
      socket.emit('sendMessage', response);
    }
    if (response) {
      setLocalMessages((prev) => [...prev, response]);
    }
    inputvalue.current.value = '';
  };


  const handleDeleteMessage = async() => { 
    await dispatch(deletemessage(currentmsg._id));
    socket.emit("deleteMessage", currentmsg._id); 
    setShowAlert(false);
    setCurrentmsg(null);
  };

const handleSeenMessage = async () => {
  if (!currentmsg) return;
  await dispatch(updateMessageSeen(currentmsg._id)); 
  socket.emit("seenMessage", currentmsg._id); 
  setShowAlert(false);
  setCurrentmsg(null);
};




  const showCustomAlert = (message) => {
    console.log('message', message)
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    setAlertMessage(message);
    setShowAlert(true);
  };


  // const handleSeenMessage = () => {
  //   setShowAlert(false);
  // };

  const handleReplyToMessage = () => {
    inputvalue.current.value = `Replying to: ${alertMessage} -> `;
    inputvalue.current.focus();
    setShowAlert(false);
  };



  const getStatusIcon = (status) => {
    if (status === 'sent') {
      return <IoCheckmarkOutline className="text-white text-[18px] ml-2" />;
    } else if (status === 'delivered') {
      return (
        <span className="flex gap-[2px] ml-2">
          <IoCheckmarkDoneOutline className="text-white text-[18px]" />
        </span>
      );
    } else if (status === 'seen') {
      return (
        <span className="flex gap-[2px] ml-2">
          <IoCheckmarkDoneOutline className="text-blue-700 text-[18px]" />
        </span>
      );
    }
    return null;
  };



  return (
    <div className="min-h-screen flex flex-col">
      {!selectedUser ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-gray-700 bg-white px-6 py-3 rounded-lg shadow-md">
            Get Started by Selecting a User
          </h1>
        </div>
      ) : (
        <>

          <div className="w-full max-w-[1150px] fixed top-0  flex justify-between items-center py-2 px-4 bg-[#F0F2F5] shadow-md z-[10] ">
            <div className="flex gap-[10px] items-center">
              <img
                src={selectedUser.profile}
                alt="Profile"
                className="ml-[13px] rounded-[50%] w-[50px] h-[50px] object-cover"
              />
              <div>
                <h3 className='text-[20px]'>{selectedUser.name}</h3>
              </div>
            </div>
            <div className="flex gap-[15px] flex-shrink-0">
              <button className="text-[20px]">
                <IoIosVideocam />
              </button>
              <button className="text-[20px]">
                <CiSearch />
              </button>
              <button className="text-[20px]">
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>


          <div className="flex-1 relative mt-[65px] px-4 pb-4 space-y-2 overflow-y-auto  z-[0]">
            {Array.isArray(localMessages) && localMessages
              .filter((message) =>
                (message.senderid === authuser._id && message.receiverid === selectedUser._id) ||
                (message.receiverid === authuser._id && message.senderid === selectedUser._id)
              )
              .map((message, index) => (
                <div key={message._id} ref={ScrollRef}>
                  <div
                
                    className={`flex ${message.senderid === authuser._id ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div
                      className={`p-3 rounded-lg  ${message.senderid === authuser._id ? 'text-white bg-[#1d882194]' : 'bg-[#25252590] text-black'}`}
                    >
                      {message.message}
                      {message.senderid === authuser._id && getStatusIcon(message.status)}
                      {/* <p className="text-xs text-gray-500 mt-1">Message ID: {message._id}</p> */}
                    </div>
                  </div>
                </div>
            
              ))}
          </div>

          <div className="flex items-center px-4 py-2 sticky bottom-0 bg-gray-100 rounded-[10px]">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 bg-[#EEEEF8] text-gray-800 rounded-md pr-[120px]"
                ref={inputvalue}
              />
              <button
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-[20px] px-3 py-1 text-black rounded-md"
                title="Voice Message"
              >
                <MdKeyboardVoice />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[25px] px-4 py-1 text-black rounded-md"
                title="Send Message"
                onClick={handleSendMessage}
              >
                <IoIosSend />
              </button>
            </div>
          </div>
          <style>
      {`
      @keyframes top-to-side {
    0% { transform: translateY(-100%) translateX(0); }
    100% { transform: translateY(-100) translateX(0); }
  }

  .animate-slide-top {
    animation: top-to-side 0.5s ease-out forwards;
      }
      `}
      </style>
          {showAlert && (
            <div className='fixed inset-0 flex items-center justify-center z-40 bg-[#8b8a885e]'>
            <div className=" h-90 animate-slide-top ">
              <div className="bg-white rounded-lg shadow-lg p-6 w-[350px] animate-slide-top">
                <h5 className="text-xl font-semibold mb-4 text-center">New Notification</h5>
                <p className="text-gray-700 text-center">{alertMessage}</p>
                <div className="flex justify-between mt-6">
                  <button
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    onClick={handleSeenMessage}
                  >
                    Seen
                  </button>
                  <button
                    className="px-4 py-2 text-green-600 border border-green-600 rounded hover:bg-green-50"
                    onClick={handleReplyToMessage}
                  >
                    Reply
                  </button>
                  <button
                    className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
                    onClick={handleDeleteMessage}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            </div>

          )}

        </>
      )}
    </div>
  );
};

export default Chat;
