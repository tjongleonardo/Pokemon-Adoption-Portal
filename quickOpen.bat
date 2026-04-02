@echo off
echo Starting Pokemon Adoption Portal...

echo.
echo === Setting up Server ===
cd server
if not exist node_modules (
    echo Installing server dependencies, this may take a moment...
    call npm install
) else (
    echo Backend dependencies found.
)

:: Start the backend server in a new command window
start "Pokemon Backend" cmd /k "title Backend Server && echo Starting Backend... && npm run dev"

cd ..

echo.
echo === Setting up Client ===
cd client
if not exist node_modules (
    echo Installing client dependencies, this may take a moment...
    call npm install
) else (
    echo Frontend dependencies found.
)

:: Start the frontend server in a new command window
start "Pokemon Frontend" cmd /k "title Frontend Server && echo Starting Frontend... && npm run dev"

echo.
echo Launch initiated! 
echo The Backend and Frontend are starting in their own terminal windows.
echo Feel free to close this window.
pause
