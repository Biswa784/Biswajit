import React, { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useRef,
  useState   
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
import { FiX, FiMinus, FiSquare, FiFolder, FiFile, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { soundManager } from '../utils/soundManager';
import './WindowManager.css';

// Create context
const WindowContext = createContext();

// Window reducer - PURE FUNCTION (NO SOUNDS HERE!)
const windowReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_WINDOW':
      // ✅ PREVENT DUPLICATE WINDOWS
      const existingWindow = state.windows.find(w => w.title === action.payload.title);
      if (existingWindow) {
        // Bring existing window to front instead of creating new one
        return {
          ...state,
          windows: state.windows.map(w =>
            w.title === action.payload.title
              ? { ...w, isMinimized: false, zIndex: state.highestZIndex + 1 }
              : w
          ),
          highestZIndex: state.highestZIndex + 1
        };
      }
      // Create new window if it doesn't exist
      return {
        ...state,
        windows: [
          ...state.windows,
          {
            id: Date.now(),
            title: action.payload.title,
            content: action.payload.content,
            icon: action.payload.icon || <FiFolder />,
            position: action.payload.position || { x: 100, y: 100 },
            size: action.payload.size || { width: 500, height: 400 },
            isMinimized: false,
            isMaximized: false,
            zIndex: state.highestZIndex + 1,
            data: action.payload.data
          }
        ],
        highestZIndex: state.highestZIndex + 1
      };
    
    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.payload)
      };
    
    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload
            ? { ...w, isMinimized: !w.isMinimized }
            : w
        )
      };
    
    case 'MAXIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload
            ? { ...w, isMaximized: !w.isMaximized }
            : w
        )
      };
    
    case 'FOCUS_WINDOW':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload
            ? { ...w, zIndex: state.highestZIndex + 1 }
            : w
        ),
        highestZIndex: state.highestZIndex + 1
      };
    
    case 'UPDATE_POSITION':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.payload.id
            ? { ...w, position: action.payload.position }
            : w
        )
      };
    
    case 'TOGGLE_SOUND':
      const enabled = soundManager.toggle();
      return { ...state, soundEnabled: enabled };
    
    default:
      return state;
  }
};

// Window Provider Component
export const WindowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(windowReducer, {
    windows: [],
    highestZIndex: 1000,
    soundEnabled: true
  });

  // ✅ UNLOCK AUDIO ON FIRST USER CLICK (Browser autoplay policy)
  useEffect(() => {
    const unlockAudio = () => {
      if (soundManager.init) {
        soundManager.init();
      }
      // Play a test sound to unlock audio context
      soundManager.play('click');
      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    
    return () => {
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

  useEffect(() => {
    soundManager.play('startup');
    return () => soundManager.play('shutdown');
  }, []);

  return (
    <WindowContext.Provider value={{ state, dispatch }}>
      {children}
      <WindowRenderer />
    </WindowContext.Provider>
  );
};

// Hook to use window context
export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within WindowProvider');
  }
  return context;
};

// Window Renderer Component
const WindowRenderer = () => {
  const { state, dispatch } = useWindows();
  const managerRef = useRef(null);

  return (
    <div className="window-manager" ref={managerRef}>
      <AnimatePresence>
        {state.windows.map(windowItem => (
          !windowItem.isMinimized && (
            <DraggableWindow
              key={windowItem.id}
              window={windowItem}
              dispatch={dispatch}
              managerRef={managerRef}
            />
          )
        ))}
      </AnimatePresence>
      
      {/* Taskbar */}
      <div className="os-taskbar">
        <div className="taskbar-start">
          <button 
            className="start-button"
            onClick={() => soundManager.play('click')}
          >
            <span className="start-icon">⏻</span>
            <span>START</span>
          </button>
        </div>
        
        <div className="taskbar-windows">
          {state.windows.map(window => (
            <button
              key={window.id}
              className={`taskbar-window ${window.isMinimized ? 'minimized' : ''}`}
              onClick={() => {
                if (window.isMinimized) {
                  dispatch({ type: 'MINIMIZE_WINDOW', payload: window.id });
                } else {
                  dispatch({ type: 'FOCUS_WINDOW', payload: window.id });
                }
                soundManager.play('click');
              }}
            >
              <span className="window-icon">{window.icon}</span>
              <span className="window-title-text">{window.title}</span>
            </button>
          ))}
        </div>
        
        <div className="taskbar-tray">
          <button 
            className="tray-icon"
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
          >
            {state.soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
          </button>
          <div className="system-time">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Draggable Window Component - WITH SOUNDS IN UI
const DraggableWindow = ({ window: win, dispatch, managerRef }) => {
  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dispatch({ type: 'FOCUS_WINDOW', payload: win.id });
    soundManager.play('drag');
  };

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    dispatch({
      type: 'UPDATE_POSITION',
      payload: { id: win.id, position: { x: data.x, y: data.y } }
    });
  };

  // ✅ FIXED: Calculate bounds using globalThis instead of shadowing window
  const getBounds = () => {
    if (managerRef?.current) {
      const rect = managerRef.current.getBoundingClientRect();
      return {
        left: 0,
        top: 0,
        right: rect.width - (win.isMaximized ? 0 : win.size.width),
        bottom: rect.height - (win.isMaximized ? 0 : win.size.height) - 40
      };
    }
    return {
      left: 0,
      top: 0,
      right: globalThis.innerWidth - win.size.width,
      bottom: globalThis.innerHeight - win.size.height - 40
    };
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-header"
      bounds={getBounds()}
      position={win.isMaximized ? { x: 0, y: 0 } : win.position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      disabled={win.isMaximized}
    >
      <motion.div
        ref={nodeRef}
        className={`os-window ${win.isMaximized ? 'maximized' : ''} ${isDragging ? 'dragging' : ''}`}
        style={{
          zIndex: win.zIndex,
          width: win.isMaximized ? '100%' : win.size.width,
          height: win.isMaximized ? 'calc(100vh - 100px)' : win.size.height,
          position: 'absolute'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'FOCUS_WINDOW', payload: win.id });
        }}
      >
        {/* Window Header */}
        <div className="window-header">
          <div className="window-controls">
            <button 
              className="control close"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('close');  // ✅ SOUND HERE
                dispatch({ type: 'CLOSE_WINDOW', payload: win.id });
              }}
            >
              <FiX />
            </button>
            <button 
              className="control minimize"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('minimize');  // ✅ SOUND HERE
                dispatch({ type: 'MINIMIZE_WINDOW', payload: win.id });
              }}
            >
              <FiMinus />
            </button>
            <button 
              className="control maximize"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('maximize');  // ✅ SOUND HERE
                dispatch({ type: 'MAXIMIZE_WINDOW', payload: win.id });
              }}
            >
              <FiSquare />
            </button>
          </div>
          
          <div className="window-title">
            <span className="title-icon">{win.icon}</span>
            <span className="title-text">{win.title}</span>
          </div>
          
          <div className="window-status">
            <span className="status-dot"></span>
          </div>
        </div>

        {/* Window Content */}
        <div className="window-content">
          {win.content}
        </div>

        {/* Window Status Bar */}
        <div className="window-statusbar">
          <span className="status-item">Ready</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item">Ln 1, Col 1</span>
        </div>
      </motion.div>
    </Draggable>
  );
};

// Folder Component
export const Folder = ({ title, icon, children }) => {
  const { dispatch } = useWindows();

  const openFolder = () => {
    soundManager.play('folder');
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: title,
        icon: icon || <FiFolder />,
        content: (
          <div className="folder-content">
            {children}
          </div>
        ),
        position: {
          x: Math.random() * 200 + 100,
          y: Math.random() * 100 + 50
        },
        size: { width: 600, height: 500 }
      }
    });
  };

  return (
    <div className="folder-item" onClick={openFolder}>
      <div className="folder-icon">
        {icon || <FiFolder size={32} />}
      </div>
      <div className="folder-name">{title}</div>
    </div>
  );
};

// File Component
export const File = ({ title, icon, content }) => {
  const { dispatch } = useWindows();

  const openFile = () => {
    soundManager.play('file');
    dispatch({
      type: 'OPEN_WINDOW',
      payload: {
        title: title,
        icon: icon || <FiFile />,
        content: content || (
          <div className="file-content">
            <h3>{title}</h3>
            <p>File content goes here...</p>
          </div>
        ),
        position: {
          x: Math.random() * 200 + 150,
          y: Math.random() * 100 + 50
        },
        size: { width: 500, height: 400 }
      }
    });
  };

  return (
    <div className="file-item" onClick={openFile}>
      <div className="file-icon">
        {icon || <FiFile size={24} />}
      </div>
      <div className="file-name">{title}</div>
    </div>
  );
};

export default WindowProvider;