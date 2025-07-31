import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# === Cargar datos ===
file_path = 'Base_Datos2_Emprendedores_Risaralda_2024.csv'
Datos = pd.read_csv(file_path)

# === Definir el orden correcto de los meses ===
orden_meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
Datos['MES'] = pd.Categorical(Datos['MES'], categories = orden_meses, ordered = True)

# === Gráfico 1: Barras - Capacidad de emprendimiento femenino ===
mujeres_emprendedoras = Datos[(Datos['P3271'] == 2) & Datos['P6430'].isin([4, 5])]
conteo_mujeres = mujeres_emprendedoras['MES'].value_counts().sort_index()

plt.figure(figsize = (10, 6))
sns.barplot(x = conteo_mujeres.index, y = conteo_mujeres.values, palette = 'Set2')
plt.title('Emprendimiento Femenino por Mes')
plt.xlabel('Mes')
plt.ylabel('Número de Emprendedoras')
plt.xticks(rotation = 45)
plt.tight_layout()
plt.show()

# === Gráfico 2: Torta - Participación de tipos de emprendimiento ===
emprendedores_con_sector = Datos[
    Datos['P6430'].isin([4, 5]) & Datos['RAMA2D_R4'].notnull()
]
emprendedores_con_sector['RAMA2D_R4'] = emprendedores_con_sector['RAMA2D_R4'].astype(int)

codigos_ciiu_2d = {
    1: 'Agricultura, ganadería y silvicultura',
    2: 'Pesca y acuicultura',
    5: 'Explotación de minas y canteras',
    10: 'Industrias manufactureras',
    35: 'Suministro de electricidad y gas',
    36: 'Distribución de agua y gestión de residuos',
    41: 'Construcción',
    45: 'Comercio y reparación de vehículos',
    47: 'Comercio al por menor',
    49: 'Transporte terrestre',
    56: 'Alojamiento y servicios de comida',
    62: 'Servicios informáticos',
    85: 'Educación',
    86: 'Salud humana y asistencia social',
    94: 'Actividades de asociaciones',
}

emprendedores_con_sector['SECTOR_ECONOMICO'] = emprendedores_con_sector['RAMA2D_R4'].map(codigos_ciiu_2d)
conteo_sectores_nombres = emprendedores_con_sector['SECTOR_ECONOMICO'].value_counts().head(10)

plt.figure(figsize = (9, 9))
plt.pie(
    conteo_sectores_nombres.values,
    labels = conteo_sectores_nombres.index,
    autopct = '%1.1f%%',
    startangle = 90,
    colors = sns.color_palette('Paired', len(conteo_sectores_nombres))
)
plt.title('Participación por Tipo de Emprendimiento (Top 10 sectores económicos)')
plt.axis('equal')
plt.tight_layout()
plt.show()

# === Gráfico 3: Líneas - Tendencia del emprendimiento por mes ===
mujeres_emprendedoras = Datos[(Datos['P3271'] == 2) & Datos['P6430'].isin([4, 5])]
conteo_emprendedoras_mes = mujeres_emprendedoras['MES'].value_counts().sort_index()

plt.figure(figsize = (10, 6))
sns.lineplot(x = conteo_emprendedoras_mes.index, y = conteo_emprendedoras_mes.values, marker = 'o')
plt.title('Tendencia del Emprendimiento Femenino (Ene-Dic 2024)')
plt.xlabel('Mes')
plt.ylabel('Cantidad de Emprendedoras')
plt.xticks(rotation = 45)
plt.grid(True)
plt.tight_layout()
plt.show()

# === Gráfico 4: Área - Comparación hombre vs mujer en emprendimiento ===
Datos['SEXO'] = Datos['P3271'].map({1: 'Hombre', 2: 'Mujer'})
emprendimiento_sexo = Datos[Datos['P6430'].isin([4, 5])]

conteo_sexo_mes = emprendimiento_sexo.groupby(['MES', 'SEXO']).size().unstack().fillna(0)
conteo_sexo_mes = conteo_sexo_mes.reindex(orden_meses)

plt.figure(figsize = (10, 6))
conteo_sexo_mes.plot.area(colormap = 'Accent', alpha = 0.8)
plt.title('Comparación de Emprendimiento: Hombres vs Mujeres')
plt.xlabel('Mes')
plt.ylabel('Número de Emprendedores')
plt.xticks(rotation = 45)
plt.tight_layout()
plt.show()

