import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import './login.css'


export default function CreateUser() {
  const schema = object({
    userName: string().required('Este campo é obrigatório').min(4, 'Mínimo de 4 caracters'),
    email: string().required('Este campo é obrigatório').email('Formato inválido'),
    password: string().required('Este campo é obrigatório').min(6, 'A sua senha deve possuir no mínimo 6 caracters' )
  }).required();
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = user => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('registered', JSON.stringify(true));
    window.location.reload(false);
  };
  return (
    <div className="login-father">
      <img className="logo-img" src="https://uploaddeimagens.com.br/images/003/635/361/full/iTonyremovido.png?1642514577" alt="itonylogo" />
      <form className="login-content" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName">
          <p>Nome de usuário</p>
        <input className="text-inputs" type="text" name="userName" {...register("userName")} />
        <p className="error-input">{errors.userName?.message}</p>
        </label>
        <label htmlFor="email">
          <p>Email</p>
        <input className="text-inputs" name="email" {...register("email")} />
        <p className="error-input">{errors.email?.message}</p>
        </label>
        <label htmlFor="password">
          <p>Senha</p>
        <input className="text-inputs" type="password" name="password" {...register("password")} />
        <p className="error-input">{errors.password?.message}</p>
        </label>
        <button className="form-button" type="submit">Criar</button>
      </form>
    </div>
  )
}