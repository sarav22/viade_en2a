import styled from 'styled-components';

export const FormWrapper = styled.section`
    margin: 20px 0px;
    width: 100%;

    .label{
        font-size: 16px;
        color: #18A9E6;
    }

    .input{
        width: 100%;
    }

    .input:invalid{
        border-color: #18A9E6;
    }

    .input:valid{
        border-color: #18A9E6;
    }
`;