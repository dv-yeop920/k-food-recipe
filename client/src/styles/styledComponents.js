import { styled } from "styled-components";


            export const Navbar = styled.nav`
                background-color: white;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -20px;
                position: sticky;
                top: 0;
                z-index:1;
            `;

            export const NavTitle = styled.h1`
                margin-left: 50px;
                margin-right: 100px;
                cursor: pointer;
            `;

            export const MenuList = styled.ul`
                list-style: none;
                display: flex;
                align-items: center;
            `;

            export const MenuItem = styled.li`
                font-size: 17px;
                font-weight: 600;
                margin-right: 50px;
                cursor: pointer;
            `;

            export const Board = styled.ul`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            `;
            export const Li = styled.li`
                list-style: none;
                padding: 10px 15px 10px 15px;
                margin-bottom: 5px;
                cursor: pointer;
                background-color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 80%;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
            `;
            export const Title = styled.h3`
                margin-bottom: 20px;
            `;

            export const Span = styled.span`
                font-size: 14px;
                color:#888;
                margin-right: 10px;
            `;

            export const BoxDiv = styled.div`
                padding: 40px 120px 50px 120px;
                margin-bottom: 5px;
                background-color: white;
                height: 20vh;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
            `;

            export const DefaultButton = styled.button`
                padding: 10px 23px 10px 23px;
                border: none;
                color: white;
                font-size: 17px;
                text-align: center;
                font-weight: 600;
                background-color: #27ae60;
                border-radius: 5px;
                margin-right: 20px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `;

            export const DeleteButton = styled.button`
                padding: 10px 23px 10px 23px;
                border: none;
                color: white;
                background-color: #bdc3c7;
                font-size: 17px;
                text-align: center;
                font-weight: 600;
                border-radius: 5px;
                margin-right: 20px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `
            export const Input = styled.input`
                flex:0.5;
                text-align: center;
                margin-right: 10px;
                background-color: #eee;
                padding: 10px;
                font-size: 16px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
            `;

            export const UserInput = styled.input`
                flex:0.5;
                margin-right: 10px;
                background-color: #eee;
                padding: 10px 10px 10px 25px;
                font-size: 16px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                width: 91%;
                margin-bottom: 15px;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
            `;

            export const InputBox = styled.div`
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 20px;
                margin-top: 30px;
            `;

            export const ScrollToTopButton = styled.button`
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #333;
                color: #fff;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 15px;
                padding-left: 6px;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px 2px;
                `;
            
            export const formContainer = styled.div`
                width: 400px;
                margin: auto;
                margin-top: 30px;
                box-shadow: #00000059 0px 5px 15px;
                padding: 25px;
            `;