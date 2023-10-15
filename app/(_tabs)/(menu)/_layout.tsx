import { Stack } from "expo-router"

export default () => {
  return  (<Stack>
            <Stack.Screen name="index" options={{headerTitle: 'Menu'}}/>
            <Stack.Screen name="Configuracoes" options={{headerTitle: 'Configurações'}}/>
            <Stack.Screen name="forum" options={{headerTitle: 'Fórum', headerShown: false}}/>
            <Stack.Screen name="EditarPerfil" options={{headerTitle: 'Editar Perfil', headerShown: true}}/>
            <Stack.Screen name="RequerimentoWeb" options={{headerTitle: 'Requerimento Web'}}/>
            <Stack.Screen name="noticias/[noticiaId]" options={{headerTitle: 'Notícia'}}/>
            <Stack.Screen name="TrilhaCurso" options={{headerTitle: 'Trilha do Curso'}}/>
           
          </Stack>)
}