import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication"

import { useAuthValue } from "../context/AuthContext"

import styles from './Navbar.module.css'

const Navbar = () => {
  const {user} = useAuthValue()

  const {logout} = useAuthentication()


  return (
    <nav className={styles.navbar}>
        <NavLink className={styles.brand} to='/'>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")} > Home</NavLink>
            </li>
            {!user && (
              <>
              
              <li>
            <NavLink to='/Login' className={({isActive}) => (isActive ? styles.active : "")} > Entrar</NavLink>
            </li>
            <li>
            <NavLink to='/Register' className={({isActive}) => (isActive ? styles.active : "")} > Registrar</NavLink>
            </li>
              
              </>
            )}
            {user && (
               <>
              
               <li>
             <NavLink to='/createPost' className={({isActive}) => (isActive ? styles.active : "")} > Novo post</NavLink>
             </li>
             <li>
             <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : "")} > Dashbord</NavLink>
             </li>
               
               </>
            )}
            <li>
            <NavLink to='/About' className={({isActive}) => (isActive ? styles.active : "")} > Sobre</NavLink>
            </li>
            {user && (
              <li>
                <button onClick={logout}>sair</button>
              </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar