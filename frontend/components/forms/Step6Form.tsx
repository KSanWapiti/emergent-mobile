import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { StepHeader } from '../ui/StepHeader';
import { RadioGroup } from '../ui/RadioGroup';
import { NavigationHeader } from '../ui/NavigationHeader';
import { MultiSelect } from '../ui/MultiSelect';
import { step6Schema, Step6FormData } from '../../utils/validation';
import { FormStyles } from '../../styles/FormStyles';

interface Step6FormProps {
  onNext: (data: Step6FormData) => void;
  onBack: () => void;
  onSkip: () => void;
  defaultValues?: Partial<Step6FormData>;
  loading?: boolean;
}

export const Step6Form: React.FC<Step6FormProps> = ({
  onNext,
  onBack,
  onSkip,
  defaultValues,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step6FormData>({
    resolver: zodResolver(step6Schema),
    mode: 'onChange',
    defaultValues: {
      ethnicType: defaultValues?.ethnicType || '',
      religion: defaultValues?.religion || '',
      hairColor: defaultValues?.hairColor || '',
      hairLength: defaultValues?.hairLength || '',
      socialCategory: defaultValues?.socialCategory || '',
      smoker: defaultValues?.smoker || '',
      numberOfChildren: defaultValues?.numberOfChildren || '',
      spokenLanguages: defaultValues?.spokenLanguages || [],
      hobbies: defaultValues?.hobbies || '',
      freePresentation: defaultValues?.freePresentation || '',
    },
  });

  const spokenLanguages = watch('spokenLanguages');

  const ethnicOptions = [
    { value: '', label: 'Optionnel' },
    { value: 'caucasien', label: 'Caucasien' },
    { value: 'africain', label: 'Africain' },
    { value: 'asiatique', label: 'Asiatique' },
    { value: 'hispanique', label: 'Hispanique' },
    { value: 'arabe', label: 'Arabe' },
    { value: 'indien', label: 'Indien' },
    { value: 'mixte', label: 'Mixte' },
    { value: 'autre', label: 'Autre' },
  ];

  const religionOptions = [
    { value: '', label: 'Optionnel' },
    { value: 'christianisme', label: 'Christianisme' },
    { value: 'islam', label: 'Islam' },
    { value: 'judaisme', label: 'Judaïsme' },
    { value: 'bouddhisme', label: 'Bouddhisme' },
    { value: 'hindouisme', label: 'Hindouisme' },
    { value: 'atheisme', label: 'Athéisme' },
    { value: 'agnosticisme', label: 'Agnosticisme' },
    { value: 'autre', label: 'Autre' },
  ];

  const hairColorOptions = [
    { value: '', label: 'Ex: Brun, Blond...' },
    { value: 'brun', label: 'Brun' },
    { value: 'blond', label: 'Blond' },
    { value: 'chatain', label: 'Châtain' },
    { value: 'roux', label: 'Roux' },
    { value: 'noir', label: 'Noir' },
    { value: 'blanc', label: 'Blanc' },
    { value: 'gris', label: 'Gris' },
    { value: 'colore', label: 'Coloré' },
  ];

  const hairLengthOptions = [
    { value: '', label: 'Ex: Court, Long...' },
    { value: 'tres_court', label: 'Très court' },
    { value: 'court', label: 'Court' },
    { value: 'mi_long', label: 'Mi-long' },
    { value: 'long', label: 'Long' },
    { value: 'tres_long', label: 'Très long' },
  ];

  const socialCategoryOptions = [
    { value: '', label: 'Ex: Cadre, Étudiant...' },
    { value: 'cadre', label: 'Cadre' },
    { value: 'employe', label: 'Employé' },
    { value: 'ouvrier', label: 'Ouvrier' },
    { value: 'profession_liberale', label: 'Profession libérale' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'etudiant', label: 'Étudiant' },
    { value: 'retraite', label: 'Retraité' },
    { value: 'sans_emploi', label: 'Sans emploi' },
    { value: 'autre', label: 'Autre' },
  ];

  const smokerOptions = [
    { value: '', label: 'Sélectionnez...' },
    { value: 'non', label: 'Non fumeur' },
    { value: 'occasionnel', label: 'Fumeur occasionnel' },
    { value: 'regulier', label: 'Fumeur régulier' },
  ];

  const childrenOptions = [
    { value: '', label: 'Sélectionnez...' },
    { value: '0', label: 'Aucun' },
    { value: '1', label: '1 enfant' },
    { value: '2', label: '2 enfants' },
    { value: '3', label: '3 enfants' },
    { value: '4+', label: '4 enfants ou plus' },
  ];

  const languageOptions = [
    { value: 'francais', label: 'Français' },
    { value: 'anglais', label: 'Anglais' },
    { value: 'espagnol', label: 'Espagnol' },
    { value: 'italien', label: 'Italien' },
    { value: 'allemand', label: 'Allemand' },
    { value: 'portugais', label: 'Portugais' },
    { value: 'arabe', label: 'Arabe' },
    { value: 'chinois', label: 'Chinois' },
    { value: 'japonais', label: 'Japonais' },
    { value: 'russe', label: 'Russe' },
    { value: 'neerlandais', label: 'Néerlandais' },
    { value: 'suedois', label: 'Suédois' },
    { value: 'norvegien', label: 'Norvégien' },
    { value: 'danois', label: 'Danois' },
  ];

  return (
    <View style={FormStyles.fullContainer}>
      <NavigationHeader showMenu={true} />
      <ProgressBar progress={100} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={FormStyles.keyboardContainer}
      >
        <ScrollView style={FormStyles.keyboardContainer} showsVerticalScrollIndicator={false}>
          <View style={FormStyles.stepContent}>
            <StepHeader
              title="Création du profil"
              subtitle="Remplissez les informations optionnels ci-dessous pour compléter votre profil"
            />

            <View style={FormStyles.stepForm}>
              {/* Row 1: Type ethnique et Religion */}
              <View style={FormStyles.formRow}>
                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Type ethnique</Text>
                  <Controller
                    control={control}
                    name="ethnicType"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={ethnicOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.ethnicType?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>

                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Religion</Text>
                  <Controller
                    control={control}
                    name="religion"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={religionOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.religion?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Row 2: Couleur et Longueur des cheveux */}
              <View style={FormStyles.formRow}>
                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Couleur des cheveux</Text>
                  <Controller
                    control={control}
                    name="hairColor"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={hairColorOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.hairColor?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>

                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Longueur des cheveux</Text>
                  <Controller
                    control={control}
                    name="hairLength"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={hairLengthOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.hairLength?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Row 3: Catégorie socio-professionnelle et Fumeur */}
              <View style={FormStyles.formRow}>
                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Cat. sociaux-professionnel</Text>
                  <Controller
                    control={control}
                    name="socialCategory"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={socialCategoryOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.socialCategory?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>

                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Fumeur</Text>
                  <Controller
                    control={control}
                    name="smoker"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={smokerOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.smoker?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Row 4: Enfants et Langues parlées */}
              <View style={FormStyles.formRow}>
                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Enfants</Text>
                  <Controller
                    control={control}
                    name="numberOfChildren"
                    render={({ field: { onChange, value } }) => (
                      <RadioGroup
                        options={childrenOptions}
                        selectedValue={value}
                        onValueChange={onChange}
                        error={errors.numberOfChildren?.message}
                        isDropdown={true}
                      />
                    )}
                  />
                </View>

                <View style={FormStyles.formColumn}>
                  <Text style={FormStyles.sectionTitle}>Langues parlées</Text>
                  <Controller
                    control={control}
                    name="spokenLanguages"
                    render={({ field: { onChange } }) => (
                      <MultiSelect
                        options={languageOptions}
                        selectedValues={spokenLanguages || []}
                        onSelectionChange={onChange}
                        placeholder="Sélectionnez..."
                        error={errors.spokenLanguages?.message}
                      />
                    )}
                  />
                </View>
              </View>

              {/* Loisirs */}
              <View style={FormStyles.formSection}>
                <Text style={FormStyles.sectionTitle}>Loisirs</Text>
                <Controller
                  control={control}
                  name="hobbies"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={FormStyles.textInput}
                      value={value}
                      onChangeText={onChange}
                      placeholder="Ex: Randonnée, Cuisine..."
                      multiline={false}
                    />
                  )}
                />
              </View>

              {/* Présentation libre */}
              <View style={FormStyles.formSection}>
                <Text style={FormStyles.sectionTitle}>Présentation libre</Text>
                <Text style={FormStyles.sectionSubtitle}>
                  Décrivez-vous en quelques mots... (min. 120 caractères)
                </Text>
                <Controller
                  control={control}
                  name="freePresentation"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[FormStyles.textInput, FormStyles.multilineInput]}
                      value={value}
                      onChangeText={onChange}
                      placeholder=""
                      multiline={true}
                      numberOfLines={4}
                      textAlignVertical="top"
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={FormStyles.stepFooter}>
          <Button
            title="Suivant"
            onPress={handleSubmit(onNext)}
            loading={loading}
            size="large"
            style={FormStyles.fullWidthButton}
          />
          
          <Button
            title="Je remplirais plus tard"
            onPress={onSkip}
            variant="ghost"
            size="large"
            style={[FormStyles.fullWidthButton, { marginTop: 12 }]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};