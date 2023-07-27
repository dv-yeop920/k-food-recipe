import { styled } from "styled-components";


            export const Navbar = styled.nav`
                position: fixed;
                top: 0;
                box-sizing: border-box;
                width: 100%;
                background-color: white;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index:1;
            `;

            export const NavTitle = styled.h1`
                margin-left: 50px;
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
                margin-right: 30px;
                cursor: pointer;
            `;

            export const LoginSignUpform = styled.form`
                display: flex;
                flex-direction: column;
                margin: 0px 30px;
            `;

            export const LoginSignUpButton = styled.button`
                width: 100%;
                margin-top: 15px;
                padding: 12px 0px;
                border: none;
                color: white;
                font-size: 17px;
                text-align: center;
                font-weight: 600;
                background-color: #27ae60;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -10px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `;

            export const SearchContainer = styled.div`
                position: absolute;
                top: 15%;
                left: 25%;
                width: 50%;
            `;

            export const Input = styled.input`
                text-align: center;
                width:75%;
                margin-right: 7px;
                border: none;
                border-bottom: 2px solid rgba(0, 0, 0, 0.2);
                padding: 11px;
                font-size: 16px;
                transition: all 0.3s ease-in-out;
                cursor: pointer;
            `;

            export const SubmitButton = styled.button`
                padding: 10px 18px;
                border: none;
                color: white;
                font-size: 17px;
                text-align: center;
                font-weight: 600;
                background-color: #27ae60;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -4px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
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

            export const BoardContainer = styled.div`
                position: absolute;
                top: 28%;
                left:10%;
                width:80%;
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
                border-radius: 30px;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -5px;
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
            `;
