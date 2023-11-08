import { styled } from "styled-components";


            export const Header = styled.header`
                        position: fixed;
                        top: 0;
                        width: 100%;
                        padding: 5px;
                        background-color: #ffffffff;
                        border-bottom: 1px solid #ddd;
                        height: 4.7em;
                        box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -23px;
                        z-index:5;
                    `;
            
            export const Container = styled.div`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: fixed;
                        inset: 0;
                        z-index: 1;
                    `;
            export const Overlay = styled.div`
                        position: fixed;
                        inset: 0;
                        background-color: rgba(0, 0, 0, 0.3);
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
                background-color: #1abc9c;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -10px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `;

            export const SearchContainer = styled.div`
                position: absolute;
                top: 21%;
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
                background-color: #1abc9c;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -4px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `;

        export const ScrollToTopButton = styled.button`
                position: fixed;
                bottom: 53px;
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
                transition: all 0.2s ease-in-out;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -10px;
            `;

            export const BoardContainer = styled.div`
                position: absolute;
                top: 38%;
                left:10%;
                width:80%;
            `;

            export const Li = styled.li`
                list-style: none;
                padding: 30px;
                margin-bottom: 20px;
                cursor: pointer;
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 30px;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -10px;
                transition: all 0.1s ease-in-out;
            `;
            export const Title = styled.h3`
                margin-bottom: 20px;
            `;

            export const Span = styled.span`
                font-size: 14px;
                color:#888;
                margin-right: 10px;
            `;


            export const DeleteButton = styled.button`
                padding: 10px 18px;
                border: none;
                color: white;
                background-color: #bdc3c7;
                font-size: 17px;
                text-align: center;
                font-weight: 600;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
                transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            `;

            export const PaginationContainer = styled.div`
                position: absolute;
                background-color: #fff;
                width: 100%;
                border=radius: 5px;
                box-shadow: rgba(0, 0, 0, 0.2) -4px 9px 25px -15px;
            `;


            export const PageUl = styled.ul`
                display: flex;
                justify-content: center;
                align-items: center;
                list-style: none;
                text-align: center;
                padding: 20px;
                
            `;

            export const PageLi = styled.li`
                font-size: 17px;
                font-weight: 600;
                padding: 10px 7px 10px 7px;
                border-radius: 48%;
                width: 25px;
                margin: 2px;
                transition: all 0.2s ease-in-out;
                &:hover {
                    cursor: pointer;
                    color: white;
                    background-color: #1abc9c;
                    transform: translateY(-2px);
                }
                &[disabled] {
                    color: white;
                    background-color: #1abc9c;
                }
            `;

            export const NextPageButton = styled.button`
                border: none;
                border-radius: 10px;
                padding: 8px;
                margin-left: 10px;
                background-color: #fff;
                color: rgba(0,0,0,0.5);
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.2s ease-in-out;
                &:hover {
                    background-color: #1abc9c;
                    color: white;
                    cursor: pointer;
                    transform: translateY(-2px);
                }
                &[disabled] {
                    display: none;
                }
            `;

            export const BackPageButton = styled.button`
                border: none;
                border-radius: 10px;
                padding: 8px;
                margin-right: 10px;
                background-color: #fff;
                color: rgba(0,0,0,0.5);
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.2s ease-in-out;
                &:hover {
                    background-color: #1abc9c;
                    color: white;
                    cursor: pointer;
                    transform: translateY(-2px);
                }

                &[disabled] {
                    display: none;
                }
            `;
